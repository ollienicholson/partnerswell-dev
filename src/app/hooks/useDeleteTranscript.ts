import { react_api } from "~/trpc/react";

export function useDeleteTranscript() {
  // mutation hook for deleting call transcript

  const deleteTranscript = react_api.transcriptRouter.deleteOne.useMutation();

  const deleteTranscriptById = async (id: string) => {
    try {
      // call the mutation to delete transcript
      await deleteTranscript.mutateAsync({
        callTranscriptId: id,
      });
      // Log frontend type and content of the speakers input
      console.log("Frontend: type:", typeof id);
      console.log("Frontend: Is an array:", Array.isArray(id));
      console.log("Frontend: content:", id.length);

      alert("Call transcript deleted successfully!");
    } catch (error) {
      console.error("Error deleting call transcript:", error);
      alert("Failed to delete transcript.");
    }
  };
  return {
    deleteTranscriptById,
    isLoading: deleteTranscript.isPending,
    error: deleteTranscript.error,
  };
}
