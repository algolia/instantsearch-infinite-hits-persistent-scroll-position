type PageProps = { params: { pid: string } };

export default function Page({ params }: PageProps) {
  return <div>My product: {params.pid}</div>;
}
