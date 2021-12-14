import { renderToString } from 'react-dom/server';
import { EntryContext, HandleDocumentRequestFunction, RemixServer } from 'remix';

const handleRequest: HandleDocumentRequestFunction = (
  request: Request,
  status: number,
  headers: Headers,
  remixContext: EntryContext,
) => {
  const markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

  headers.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, { status, headers });
};

export default handleRequest;
