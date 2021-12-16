import { ChakraProvider } from '@chakra-ui/react';
import { CatchBoundaryComponent } from '@remix-run/react/routeModules';
import {
  ErrorBoundaryComponent,
  Links,
  LiveReload,
  Meta,
  Outlet,
  RouteComponent,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix';
import { Layout } from './components/Layout';
import { Page } from './components/Page';

const Document: React.FC<{ title?: string }> = ({ children, title }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      {title ? <title>{title}</title> : null}
      <Meta />
      <Links />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
      {process.env.NODE_ENV === 'development' && <LiveReload />}
    </body>
  </html>
);

const App: RouteComponent = () => (
  <Document>
    <ChakraProvider>
      <Layout>
        <Outlet />
      </Layout>
    </ChakraProvider>
  </Document>
);

const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);

  return (
    <Document title="Error!">
      <ChakraProvider>
        <Layout>
          <Page title="There was an error">
            <p>{error.message}</p>
            <hr />
            <p>Hey, developer, you should replace this with what you want your users to see.</p>
          </Page>
        </Layout>
      </ChakraProvider>
    </Document>
  );
};

const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch();

  let message;

  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
      break;
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <ChakraProvider>
        <Layout>
          <Page title={`${caught.status}: ${caught.statusText}`}>{message}</Page>
        </Layout>
      </ChakraProvider>
    </Document>
  );
};

export default App;
export { ErrorBoundary, CatchBoundary };
