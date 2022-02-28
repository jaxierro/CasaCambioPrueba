using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasaCambio.Core.Data
{
    public class BaseDA : IBaseDA
    {
        private string _connectionstring = "Server=DESKTOP-K6GEUKA\\SQLEXPRESS;Database=CasaCambio;Trusted_Connection=True;MultipleActiveResultSets=True;Persist Security Info=True;";

        public string ConnectionString
        {
            get
            {
                return _connectionstring;
            }
            set
            {
                _connectionstring = value;
            }

        }

        public BaseDA(string connstr)
        {
            if (!String.IsNullOrEmpty(connstr))
                _connectionstring = connstr;
        }

        public BaseDA()
        {

        }

        public SqlConnection Conectar()
        {
            try
            {
                SqlConnection conn = new SqlConnection(ConnectionString);

                conn.Open();

                return conn;
            }
            catch (Exception)
            {
          ﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasaCambio.Core.Data
{
    public class BaseDA : IBaseDA
    {
        private string _connectionstring = "Server=DESKTOP-K6GEUKA\\SQLEXPRESS;Database=CasaCambio;Trusted_Connection=True;MultipleActiveResultSets=True;Persist Security Info=True;";

        public string ConnectionString
        {
            get
            {
                return _connectionstring;
            }
            set
            {
                _connectionstring = value;
            }

        }

        public BaseDA(string connstr)
        {
            if (!String.IsNullOrEmpty(connstr))
                _connectionstring = connstr;
        }

        public BaseDA()
        {

        }

        public SqlConnection Conectar()
        {
            try
            {
                SqlConnection conn = new SqlConnection(ConnectionString);

                conn.Open();

                return conn;
            }
            catch (Exception)
            {
                return null;
            }
        }


    }
}
