import { useDeleteTranscript } from "~/app/hooks/useDeleteTranscript";
import { Button } from "~/app/components/ui/button";

type DeleteCallTranscriptButtonProps = {
  id: string;
  onDelete?: () => void; // Optional callback for additional behavior
};

export default function DeleteCallTranscriptButton({
  id,
  onDelete,
}: DeleteCallTranscriptButtonProps) {
  const { deleteTranscriptById, isLoading, error } = useDeleteTranscript();

  const handleDelete = () => {
    deleteTranscriptById(id);

    if (onDelete) {
      onDelete();
    }
  };

  if (isLoading) return <p>Deleting meeting...</p>;

  if (error) return <p>Error deleting meeting: {error.message}</p>;

  return (
    <Button
      variant="pswellDestructive"
      onClick={handleDelete}
      disabled={isLoading}
    >
      Delete Meeting
    </Button>
  );
}
