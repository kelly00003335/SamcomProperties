import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactMessage } from "@shared/schema";
import { timeAgo } from "@/lib/utils";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Trash } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface MessageListProps {
  messages: ContactMessage[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const [deleteMessageId, setDeleteMessageId] = useState<number | null>(null);
  const [viewMessage, setViewMessage] = useState<ContactMessage | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMessage = useMutation({
    mutationFn: async (id: number) => {
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
  });

  const handleDeleteClick = (id: number) => {
    deleteMessage.mutate(id);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No messages found
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium">{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{message.subject}</Badge>
                  </TableCell>
                  <TableCell>{
                    message.createdAt ? timeAgo(message.createdAt.toString()) : "Unknown"
                  }</TableCell>
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
                          onClick={() => setViewMessage(message)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
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

      {/* Message View Dialog */}
      <Dialog open={viewMessage !== null} onOpenChange={() => setViewMessage(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message from {viewMessage?.name}</DialogTitle>
            <DialogDescription>
              Received{" "}
              {viewMessage?.createdAt
                ? timeAgo(viewMessage.createdAt.toString())
                : "Unknown"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium leading-none">Email</p>
              <p className="text-sm text-muted-foreground">
                {viewMessage?.email}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium leading-none">Subject</p>
              <p className="text-sm text-muted-foreground">
                {viewMessage?.subject}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium leading-none">Message</p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {viewMessage?.message}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
              message from our servers.
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