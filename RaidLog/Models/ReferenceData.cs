using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RaidLog.Models
{
    public class ReferenceData
    {
        public ReferenceData(IEnumerable<ApproachDto> approaches, IEnumerable<ImpactDto> impacts, IEnumerable<LikelihoodDto> likelihoods, IEnumerable<RifCategoryDto> rifCategories)
        {
            Approaches = approaches.ToArray();
            Impacts = impacts.ToArray();
            Likelihoods = likelihoods.ToArray();
            RifCategories = rifCategories.ToArray();
        }

        public ApproachDto[] Approaches { get; set; }

        public ImpactDto[] Impacts { get; set; }

        public LikelihoodDto[] Likelihoods { get; set; }

        public RifCategoryDto[] RifCategories { get; set; }
 
    }

    public class ApproachDto
    {
        public int Id { get; private set; }

        public String Description { get; private set; }
    }

    public class ImpactDto
    {

        public int Id { get; set; }

        public string Description { get; private set; }

        public int Score { get; private set; }

        public string BudgetImpact { get; private set; }

        public string TimeOverrunImpact { get; private set; }

        public string BusinessImpact { get; private set; }

        public string ReputationalImpact { get; private set; }
    }

    public class LikelihoodDto
    {
        public int Id { get; private set; }

        public string Description { get; private set; }

        public int Score { get; private set; }

    }

    public class RifCategoryDto
    {

        public int Id { get; private set; }

        public string Description { get; private set; }
    }
}