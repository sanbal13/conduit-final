function Pagination(props) {
  let { articlesCount, articlesPerPage, activePageIndex } = props;
  let numberOfPages = Math.ceil(articlesCount/articlesPerPage);
  let pagesArray = Array.from({length: numberOfPages}, (_v,i) => i + 1);
  return (
    <div className="flex justify-center item-center pagination wrap">
      <div className="prev" onClick={() =>props.updateCurrentPageIndex(activePageIndex - 1 < 1 ? 1 : activePageIndex - 1)}>
        <p>Prev</p>
      </div>
      <div className="pagination-count flex flex-wrap justify-start">
          {
              pagesArray.map((page) => <span key={page} onClick={() =>props.updateCurrentPageIndex(page)}className={activePageIndex === page ? "active page" : "page"} >{page}</span>  )
          }
      </div>
      <div className="next" onClick={() =>props.updateCurrentPageIndex(activePageIndex + 1 > numberOfPages ? numberOfPages : activePageIndex + 1 )}>
        <p>Next</p>
      </div>
    </div>
  );
}
export default Pagination;
