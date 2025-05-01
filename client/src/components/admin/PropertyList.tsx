import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import { formatPriceDisplay } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PropertyListProps {
  properties: Property[];
  onEditClick: (property: Property) => void;
}

const PropertyList = ({ properties, onEditClick }: PropertyListProps) => {
  const [deletePropertyId, setDeletePropertyId] = useState<string | number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteProperty = useMutation({
    mutationFn: async (id: string | number) => {
      console.log(`Attempting to delete property with ID: ${id} (type: ${typeof id})`);
      return await apiRequest(`/api/properties/${id}`, "DELETE");
    },
    onSuccess: () => {
      toast({
        title: "Property deleted",
        description: "The property has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      setDeletePropertyId(null);
    },
  });

  const handleDeleteProperty = (id: string | number) => {
    console.log(`Handling delete for property ID: ${id}`);
    deleteProperty.mutate(id);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No properties found
                </TableCell>
              </TableRow>
            ) : (
              properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">
                    <div className="font-semibold">{property.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {property.bedrooms}{" "}
                      {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"} •{" "}
                      {property.bathrooms}{" "}
                      {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                    </div>
                  </TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {property.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className="capitalize"
                      variant={property.status === "for-sale" ? "default" : "secondary"}
                    >
                      {property.status === "for-sale"
                        ? "For Sale"
                        : "For Rent"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatPriceDisplay(property.price, property.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => onEditClick(property)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeletePropertyId(property.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={deletePropertyId !== null}
        onOpenChange={(open) => !open && setDeletePropertyId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              property and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deletePropertyId && handleDeleteProperty(deletePropertyId)
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PropertyList;