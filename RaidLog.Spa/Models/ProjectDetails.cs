using System.Collections.Generic;

namespace RaidLog.Models
{
    public class ProjectDetails
    {
        public ProjectDetails(int id, int versionNumber, string code, string name)
        {
            Id = id;
            VersionNumber = versionNumber;
            Code = code;
            Name = name;
        }

        public int Id { get; set; }
        public int VersionNumber { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }

    }
}