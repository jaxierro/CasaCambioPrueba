using System;

namespace CasaCambio.Core.Utils
{
    [Serializable]
    public class Response
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public virtual object Result { get; set; }

        public bool IsNotSuccess => !IsSuccess;

        public Response()
        {
            IsSuccess = true;
            Message = string.Empty;
        }

        public Response(bool isSuccess, string message = "", object result = null)
        {
            IsSuccess = isSuccess;
            Message = message;
            Result = result;
        }

        public static Response Success(object result = null)
        {
            return new Response(true, "", result);
        }

        public static Response Unsuccess(string message = "")
        {
            return new Response(false, message);
        }
    }

    [Serializable]
    public class Response<T> : Response where T : class
    {
        public new T Result { get; set; }
        public Response()
        {
            Message = string.Empty;
        }

        public Response(bool isSuccess, string message = "", T result = default(T))
        {
            IsSuccess = isSuccess;
            Message = message;
            Result = result;
        }

        public static Response<T> Success(T result = default(T))
        {
            return new Response<T>(true, "", result);
        }

        public static new Response<T> Unsuccess(string message = "")
        {
            return new Response<T>(false, message);
        }
    }
    [Serializable]
    public class PagedResponse : Response
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int TotalRecords { get; set; }
    }

    [Serializable]
    public class PagedResponse<T> : Response<T> where T : class
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        //public Uri FirstPage { get; set; }
        //public Uri LastPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalRecords { get; set; }
        //public Uri NextPage { get; set; }
        //public Uri PreviousPage { get; set; }

        public PagedResponse(T data, int pageNumber, int pageSize)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            Result = data;
            Message = null;
            IsSuccess = true;
        }

        public PagedResponse(bool IsSuccess, string message = "", T result = default(T), PagedResponse paged = default(PagedResponse))
        {
            this.IsSuccess = IsSuccess;
            Result = result;
            Message = message;
            if (paged != null)
            {
                PageNumber = paged.PageNumber;
                PageSize = paged.PageSize;
                TotalPages = paged.TotalPages;
                TotalRecords = paged.TotalRecords;
            }

        }
    }

    public class PaginationRequest
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public PaginationRequest()
        {
            this.PageNumber = 1;
            this.PageSize = 10;
        }
        public PaginationRequest(int pageNumber, int pageSize)
        {
            this.PageNumber = pageNumber < 1 ? 1 : pageNumber;
            this.PageSize = pageSize > 100 ? 100 : pageSize;
        }
    }

}