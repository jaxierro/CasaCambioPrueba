using CasaCambio.Core.Models;
using System;
using System.Collections.Generic;

namespace CasaCambio.Web.ModelView
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class ResultClientesView
    {
        public int idCliente { get; set; }
        public string documentoID { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public DateTime fechaReg { get; set; }
        public DateTime fechaAct { get; set; }
        public int estatus { get; set; }
    }

    public class Root
    {
        public List<ResultClientesView> result { get; set; }
        public bool isSuccess { get; set; }
        public string message { get; set; }
        public bool isNotSuccess { get; set; }
    }

    public class RootSample
    {
        public ResultClientesView result { get; set; }
        public bool isSuccess { get; set; }
        public string message { get; set; }
        public bool isNotSuccess { get; set; }
    }

}






