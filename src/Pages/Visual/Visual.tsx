import { Header } from "../../components/Header/Header";
import { Items } from "../../components/Items/Items";
import { PageContainer } from "../../components/Page-container/Page-container";

interface VisualProps { }

export function Visual(props: VisualProps) {
  return (
    <>
      <Header />
      <PageContainer layoutType="dark">
        <h1 className="text-primary bg-red-500">Visual</h1>
        <Items name="visual-helmet" />
      </PageContainer >
    </>
  )
}
