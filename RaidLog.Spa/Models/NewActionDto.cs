using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RaidLog.Spa.Models
{
    /*
     @parentItemId int, 
    @parentItemType nvarchar(50),
    @description nvarchar(256),
    @actor nvarchar(50),
    @actionStatusId int,
    @dueDate date
     */
    public class NewActionDto
    {
        public int ParentItemId { get; set; }

        [Required]
        [StringLength(50)]
        public string ParentItemType { get; set; }
        
        [Required]
        [StringLength(256)]
        public string Description { get; set; }

        [Required]
        [StringLength(50)]
        public string Actor { get; set; }

        public int ActionStatusId { get; set; }

        public DateTime? DueDate { get; set; }

    }
}