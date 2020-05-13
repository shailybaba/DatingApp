namespace DatingApp.API.Helpers
{
    public class PaginationHeader
    {        
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int TotalCount { get; set; }

        public PaginationHeader(int currentPage,int pageSize,int totalPages,int totalCount)
        {
            this.TotalCount=totalCount;
            this.PageSize=pageSize;
            this.CurrentPage=currentPage;
            this.TotalPages=totalPages;           
        }
    }
}