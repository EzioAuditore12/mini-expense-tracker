import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(main)/expense/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(main)/expense/"!</div>;
}
