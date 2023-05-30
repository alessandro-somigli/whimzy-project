import ReactivePost from "@/components/reactivePost";

export default async function Page({ params }: { params: { id: number } }) {
  
  return (
    <main>
      <ReactivePost postId={params.id} />
    </main>
  );
}