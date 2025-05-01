import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const FirebaseAdmin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [collections, setCollections] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all collections
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // Hardcoded collections since Firebase doesn't provide a way to list all collections
        const collectionsList = [
          'properties',
          'agents',
          'testimonials',
          'contactMessages',
          'newsletters'
        ];
        setCollections(collectionsList);
      } catch (error) {
        console.error('Error fetching collections:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load Firebase collections.'
        });
      }
    };

    fetchCollections();
  }, [toast]);

  // Fetch documents when a collection is selected
  useEffect(() => {
    if (!selectedCollection) return;

    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, selectedCollection));
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDocuments(docs);
      } catch (error) {
        console.error(`Error fetching ${selectedCollection}:`, error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: `Failed to load documents from ${selectedCollection}.`
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [selectedCollection, toast]);

  // Delete a document
  const handleDeleteDocument = async (docId: string) => {
    if (!selectedCollection || !window.confirm('Are you sure you want to delete this document?')) return;

    try {
      await deleteDoc(doc(db, selectedCollection, docId));
      setDocuments(documents.filter(doc => doc.id !== docId));
      toast({
        title: 'Success',
        description: 'Document deleted successfully!'
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete document.'
      });
    }
  };

  // Display a document preview
  const renderDocumentPreview = (document: any) => {
    const preview = { ...document };
    delete preview.id; // Remove ID from preview

    // Limit content length and handle complex objects
    const processValue = (value: any) => {
      if (typeof value === 'string') {
        return value.length > 100 ? value.substring(0, 100) + '...' : value;
      }
      if (Array.isArray(value)) {
        return `Array[${value.length}]`;
      }
      if (value instanceof Date) {
        return value.toISOString();
      }
      if (typeof value === 'object' && value !== null) {
        return 'Object';
      }
      return String(value);
    };

    return (
      <div className="p-4 bg-white rounded-md shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(preview).slice(0, 6).map(([key, value]) => (
            <div key={key} className="truncate">
              <span className="font-semibold">{key}:</span>{' '}
              <span className="text-gray-600">{processValue(value)}</span>
            </div>
          ))}
          {Object.keys(preview).length > 6 && (
            <div className="col-span-2 text-sm text-gray-500">
              + {Object.keys(preview).length - 6} more fields
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!user) {
    return <div>Please log in to access admin features</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Firebase Database Manager</h2>

      {/* Collection Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Collection:</label>
        <div className="flex flex-wrap gap-2">
          {collections.map(collectionName => (
            <Button
              key={collectionName}
              variant={selectedCollection === collectionName ? 'default' : 'outline'}
              onClick={() => setSelectedCollection(collectionName)}
            >
              {collectionName}
            </Button>
          ))}
        </div>
      </div>

      {/* Documents Display */}
      {selectedCollection && (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            {selectedCollection} ({documents.length} documents)
          </h3>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No documents found in this collection
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map(doc => (
                <div key={doc.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                    <div className="font-mono text-sm truncate flex-1" title={doc.id}>
                      ID: {doc.id}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteDocument(doc.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  {renderDocumentPreview(doc)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FirebaseAdmin;
