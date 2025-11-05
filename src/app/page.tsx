import CodeVisualizer from '@/components/codesight/code-visualizer';
import Header from '@/components/codesight/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <CodeVisualizer />
      </main>
    </div>
  );
}
