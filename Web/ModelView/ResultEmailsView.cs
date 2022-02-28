using CasaCambio.Core.Models;
using System;
using System.Collections.Generic;

namespace CasaCambio.Web.ModelView
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class ResultEmailsView
    {
        public int idEmail { get; set; }
        public int idCliente { get; set; }
        public string email { get; set; }
        public DateTime fechaReg { get; set; }
        public DateTime fechaAct { get; set; }
        public int estatus { get; set; }
        public string nombrecliente { get; set; }
    }

    public class RootEmails
    {
        public List<ResultEmailsView> result { get; set; }
        public bool isSuccess { get; set; }
        public string message { get; set; }
        public bool isNotSuccess { get; set; }
    }

    public class RootSampleEmails
    {
        public ResultEmailsView result { get; set; }
        public bool isSuccess { get; set; }
        public string message { get; set; }
        public bool isNotSuccess { get; set; }
    }

}





﻿using CasaCambio.Core.Models;
using System;
using System.Collections.Generic;

namespace CasaCambio.Web.ModelView
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class ResultEmailsView
    {
        public int idEmail { get; set; }
        public int idCliente { get; set; }
        public string email { get; set; }
        public DateTime fechaReg { get; set; }
        public DateTime fechaAct { get; set; }
        public int estatus { get; set; }
        public string nombrecliente { get; set; }
    }

    public class RootEmails
    {
        public List<ResultEmailsView> result { get; set; }
        public bool isSuccess { get; set; }
        public string message { get; set; }
        public bool isNotSuccess { get; set; }
    }

    public class RootSampleEmails
    {
        public ResultEmailsView result { get; set; }
        public bool isSuccess { get; set; }
        public string message { get; set; }
        public bool isNotSuccess { get; set; }
    }

}






