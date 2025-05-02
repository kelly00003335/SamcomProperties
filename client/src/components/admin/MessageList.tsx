
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactMessage } from "@shared/schema";
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
import { Badge } from "@/components/ui/badge";
import { Eye, MoreHorizontal, Trash } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface MessageListProps {
  messages: ContactMessage[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const [deleteMessageId, setDeleteMessageId] = useState<string | number | null>(null);
  const [viewedMessage, setViewedMessage] = useState<ContactMessage | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMessage = useMutation({
    mutationFn: async (id: string | number) => {
      return await apiRequest(`/api/contact/${id}`, "DELETE");
    },
    onSuccess: () => {
      toast({
        title: "Message deleted",
        description: "The message has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contact/all"] });
      setDeleteMessageId(null);
    },
    onError: (error) => {
      console.error("Error deleting message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the message. Please try again.",
      });
    }
  });

  const handleDeleteClick = (id: string | number) => {
    deleteMessage.mutate(id);
  };

  // Format date for display
  const formatDate = (dateValue: Date | string | number | null | undefined) => {
    if (!dateValue) return "N/A";
    
    try {
      const date = typeof dateValue === 'object' ? dateValue : new Date(dateValue);
      return format(date, 'MMM dd, yyyy - h:mm a');
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No messages found
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{message.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {message.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{message.subject}</Badge>
                  </TableCell>
                  <TableCell>
                    {formatDate(message.createdAt)}
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
                        <DropdownMenuItem onClick={() => setViewedMessage(message)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Message
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteMessageId(message.id)}
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

      {/* View Message Dialog */}
      <AlertDialog
        open={viewedMessage !== null}
        onOpenChange={(open) => !open && setViewedMessage(null)}
      >
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">{viewedMessage?.subject}</AlertDialogTitle>
            <div className="flex flex-col space-y-1 text-sm text-muted-foreground mt-2">
              <div>
                <span className="font-semibold">From: </span>
                {viewedMessage?.name} ({viewedMessage?.email})
              </div>
              <div>
                <span className="font-semibold">Phone: </span>
                {viewedMessage?.phone}
              </div>
              <div>
                <span className="font-semibold">Date: </span>
                {viewedMessage && formatDate(viewedMessage.createdAt)}
              </div>
            </div>
          </AlertDialogHeader>
          <div className="bg-gray-50 p-4 rounded-md my-4">
            <p className="whitespace-pre-line">{viewedMessage?.message}</p>
          </div>
          <AlertDialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = `mailto:${viewedMessage?.email}?subject=Re: ${viewedMessage?.subject}`}
            >
              Reply by Email
            </Button>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteMessageId !== null}
        onOpenChange={(open) => !open && setDeleteMessageId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              message and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteMessageId && handleDeleteClick(deleteMessageId)
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

export default MessageList;
