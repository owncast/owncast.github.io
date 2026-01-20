const Image = ({ loading, decoding, ...rest }) => (
	<img loading={loading ?? "lazy"} decoding={decoding ?? "async"} {...rest} />
);

export default Image;
