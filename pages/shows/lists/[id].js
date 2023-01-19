export default function ShowList(props) {
  return (
    <div className="white">
      <p>Show Lists coming soon&trade;</p>
    </div>
  )
}

export const getStaticPaths = async ({ url, query }) => {
  const paths = [];
  return {
    paths,
    fallback: 'blocking',
  };
};


export const getStaticProps = async (ctx) => {
  return {
    props: {
      url: ctx?.resolvedUrl ?? null,
      query: ctx?.query ?? null,
    },
  };
};