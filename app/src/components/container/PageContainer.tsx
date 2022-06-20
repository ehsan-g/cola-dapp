import { Helmet } from "react-helmet";

const PageContainer = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: any;
}) => (
  <div>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </div>
);

export default PageContainer;
