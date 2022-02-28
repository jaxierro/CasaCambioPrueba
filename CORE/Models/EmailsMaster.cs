using Dapper.Contrib.Extensions;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CasaCambio.Core.Models
{
    public class Emails
    {
        [ExplicitKey]
        [System.ComponentModel.DataAnnotations.Key]
        public int IdEmail { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        public int IdCliente { get; set; }

        public DateTime FechaReg { get; set; }

        public DateTime FechaAct { get; set; }

        public int Estatus { get; set; }

        [NotMapped]
        public string NombreCliente { get; set; }

    }
}
