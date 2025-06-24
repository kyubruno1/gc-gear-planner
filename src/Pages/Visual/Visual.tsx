import { Header } from "../../components/Header/Header";
import { Items } from "../../components/Items";
import { PageContainer } from "../../components/Page-container/Page-container";

interface VisualProps { }

export function Visual(props: VisualProps) {
  return (
    <>
      <Header />
      <PageContainer layoutType="dark">
        <h1>Visual</h1>
        <Items name="visual-helmet" />
      </PageContainer >
    </>
  )
}
