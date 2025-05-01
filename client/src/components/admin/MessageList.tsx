import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactMessage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, AlertTriangle, Mail, Phone } from "lucide-react";

interface MessageListProps {
  messages: ContactMessage[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(null);
  const [expandedMessage, setExpandedMessage] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/contact/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      toast({
        title: "Message deleted",
        description: "The message has been deleted successfully.",
      });
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem deleting the message.",
      });
    },
  });

  const handleDeleteClick = (message: ContactMessage) => {
    setMessageToDelete(message);
    setDeleteDialogOpen(true);
  };

  const toggleExpand = (id: number) => {
    setExpandedMessage(expandedMessage === id ? null : id);
  };

  const confirmDelete = () => {
    if (messageToDelete) {
      deleteMessageMutation.mutate(messageToDelete.id);
    }
  };

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <Mail className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No messages</h3>
        <p className="mt-1 text-sm text-gray-500">
          There are no contact messages in your inbox.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.map((message) => (
          <Card key={message.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{message.name}</CardTitle>
                  <CardDescription className="mt-1">{formatDate(message.createdAt)}</CardDescription>
                </div>
                <Badge>{message.subject}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>{message.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  <span>{message.phone}</span>
                </div>
              </div>
              <div className={`text-sm ${expandedMessage === message.id ? '' : 'line-clamp-3'}`}>
                {message.message}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleExpand(message.id)}
              >
                {expandedMessage === message.id ? "Show Less" : "Read More"}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleDeleteClick(message)}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" /> Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this message from <strong>{messageToDelete?.name}</strong>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteMessageMutation.isPending}
            >
              {deleteMessageMutation.isPending ? "Deleting..." : "Delete Message"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MessageList;
