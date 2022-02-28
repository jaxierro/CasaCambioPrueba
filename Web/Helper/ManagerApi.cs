using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;

namespace CasaCambio.Helper
{

    public enum WebServiceErrorCode
        {
            TokenNotCreated = 1,
            TokenInvalid = 2,
            InvalidEmailPassword = 3,
            NotAuthorizedForThisPanel = 4,
            UserNotExist = 5,
            TokenNotRemoved = 6,
            LoginUserIsRequered = 7,
            InvalidCorporateSelection = 8,
            EmailAlreadyExist = 9,
            UserNoSaved = 10,
            UserNoUpdated = 11,
            Ok = 12,
            ErrorGeneral = 13
        }

        public class WebServiceResult
        {
            [JsonProperty("error_code")]
            public string ErrorCode { get; set; }
            [JsonProperty("error_message")]
            public string ErrorMessage { get; set; }
            [JsonProperty("response")]
            public string Response { get; set; }
            [JsonProperty("data")]
            public string Data { get; set; }
        }

        public class ManagerApi
        {

            //private IRestResponse _response;
            //private readonly RestClient _restClient;
            //private readonly RestRequest _request;
            public string UrlBase { get; set; }

             public string RequestResource { get; set; }
            public WebServiceErrorCode ServiceErrorCode { get; set; }
            public string WebServiceMessage { get; set; }
            public HttpStatusCode OK { get; private set; }

            public Dictionary<string, string> RequestParameters;


         public ManagerApi(string baseUrl, string namemethod = "")
         {
         using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;

namespace CasaCambio.Helper
{

    public enum WebServiceErrorCode
        {
            TokenNotCreated = 1,
            TokenInvalid = 2,
            InvalidEmailPassword = 3,
            NotAuthorizedForThisPanel = 4,
            UserNotExist = 5,
            TokenNotRemoved = 6,
            LoginUserIsRequered = 7,
            InvalidCorporateSelection = 8,
            EmailAlreadyExist = 9,
            UserNoSaved = 10,
            UserNoUpdated = 11,
            Ok = 12,
            ErrorGeneral = 13
        }

        public class WebServiceResult
        {
            [JsonProperty("error_code")]
            public string ErrorCode { get; set; }
            [JsonProperty("error_message")]
            public string ErrorMessage { get; set; }
            [JsonProperty("response")]
            public string Response { get; set; }
            [JsonProperty("data")]
            public string Data { get; set; }
        }

        public class ManagerApi
        {

            //private IRestResponse _response;
            //private readonly RestClient _restClient;
            //private readonly RestRequest _request;
            public string UrlBase { get; set; }

             public string RequestResource { get; set; }
            public WebServiceErrorCode ServiceErrorCode { get; set; }
            public string WebServiceMessage { get; set; }
            public HttpStatusCode OK { get; private set; }

            public Dictionary<string, string> RequestParameters;


         public ManagerApi(string baseUrl, string namemethod = "")
         {
            UrlBase         = baseUrl;
            RequestResource = namemethod;

             //_restClient = new RestClient(UrlBase);
             //_request    = new RestRequest(RequestResource) { RequestFormat = DataFormat.Json };
         }

         //public async Task<string> ReadByGet(Dictionary<string, string> requestParameters)
         //{
         //    try
         //    {

         //       if (_request.Parameters.Count > 0) _request.Parameters.Clear();

         //       foreach (var param in requestParameters) 
         //       {
         //           var arg         = new Parameter(param.Key, param.Value, ParameterType.GetOrPost);
         //           arg.ContentType = "application/json";
         //           arg.DataFormat  = DataFormat.Json;
         //          _request.Parameters.Add(arg);
         //       }

         //       _request.Method        = Method.GET;
         //       _request.RequestFormat = DataFormat.Json;
         //       ServiceErrorCode = WebServiceErrorCode.Ok;
         //       _response  = await _restClient.ExecuteAsync(_request);
         //       return _response.Content;

         //    }
         //    catch(Exception ex)
         //    {
         //        ServiceErrorCode = WebServiceErrorCode.ErrorGeneral;
         //        return ex.Message;
         //    }
         //}

         //public async Task<string> WriteByPost(object valueJson)
         //{
         //    try
         //    {
                
         //       _request.Method        = Method.POST;
         //       _request.RequestFormat = DataFormat.Json;
         //       ServiceErrorCode = WebServiceErrorCode.Ok;
         //       _request.AddJsonBody(valueJson);
         //       _response  = await _restClient.ExecuteAsync(_request);
         //       if (_response.Content != string.Empty)  ServiceErrorCode = WebServiceErrorCode.ErrorGeneral;
         //       return _response.Content;

         //    }
         //    catch(Exception ex)
         //    {
         //        ServiceErrorCode = WebServiceErrorCode.ErrorGeneral;
         //        return ex.Message;
         //    }
         //}

          public async Task<string> ExecuteEndPointPostAsync(StringContent valueJson)
          {
              try
              {
                  using (var httpClient = new HttpClient())
                  {
                        
                        httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
                        using (var response = await httpClient.PostAsync(UrlBase + RequestResource, valueJson))
                        {
                            string apiResponse  = await response.Content.ReadAsStringAsync();
                            return apiResponse;
                        }

                  }
              }
              catch(Exception ex)
              {
                  return ex.Message;
              }
          }

           public async Task<string> ExecuteEndPointPostAutorizeAsync
           (  
               StringContent valueJson, 
               string tokens
           )
          {
              try
              {
                  using (var httpClient = new HttpClient())
                  {
                       httpClient.DefaultRequestHeaders.Authorization 
                         = new AuthenticationHeaderValue("Bearer", tokens);
                      httpClient.DefaultRequestHeaders.Add("Accept", "application/json");

                      using (var response = await httpClient.PostAsync(UrlBase + RequestResource, valueJson))
                      {
                         string apiResponse  = await response.Content.ReadAsStringAsync();
                         return apiResponse;
                      }
                  }
              }
              catch(Exception ex)
              {
                  return ex.Message;
              }
          }

          public async Task<string> ExecuteEndPointGetAsync(Uri u, string tokens)
          {
              try
              {
                  using (var httpClient = new HttpClient())
                  {

                      httpClient.DefaultRequestHeaders.Authorization 
                         = new AuthenticationHeaderValue("Bearer", tokens);
                      httpClient.DefaultRequestHeaders.Add("Accept", "application/json");

                      using (var response = await httpClient.GetAsync(u))
                      {
                         string apiResponse  = await response.Content.ReadAsStringAsync();
                         return apiResponse;
                      }
                  }
              }
              catch(Exception ex)
              {
                  return ex.Message;
              }
          }

        public async Task<string> ExecuteEndPointGetAsync(Uri u)
        {
            try
            {
                using (var httpClient = new HttpClient())
                {
                    httpClient.DefaultRequestHeaders.Add("Accept", "application/json");

                    using (var response = await httpClient.GetAsync(u))
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        return apiResponse;
                    }
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


    }
}