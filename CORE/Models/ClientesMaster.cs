using Dapper.Contrib.Extensions;
using System;
using System.ComponentModel.DataAnnotations;

namespace CasaCambio.Core.Models
{
    public class Clientes
    {
        [System.ComponentModel.DataAnnotations.Key]
        [ExplicitKey]
        public int IdCliente { get; set; }

        public string DocumentoID { get; set; }

        public string Nombres { get; set; }

        public string Apellidos { get; set; }

        public DateTime FechaReg { get; set; }

        public DateTime FechaAct { get; set; }

        public int Estatus { get; set; }
    }
}
