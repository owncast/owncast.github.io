import useBaseUrl from '@docusaurus/useBaseUrl';

const Image = ({ src, ...rest }: { src?: string } & React.ImgHTMLAttributes<HTMLImageElement>) => {
  const resolvedSrc = useBaseUrl(src);
  return <img src={resolvedSrc} {...rest} />;
};

export default Image;
