using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RaidLog.Models
{
    public class ReferenceData
    {
        public ReferenceData(IEnumerable<ApproachDto> approaches, 
            IEnumerable<ImpactDto> impacts, 
            IEnumerable<LikelihoodDto> likelihoods, 
            IEnumerable<RifCategoryDto> rifCategories,
            IEnumerable<AssumptionStatusDto> assumptionStatuses )
        {
            Approaches = approaches.ToArray();
            Impacts = impacts.ToArray();
            Likelihoods = likelihoods.ToArray();
            RifCategories = rifCategories.ToArray();
            AssumptionStatuses = assumptionStatuses.ToArray();
        }

        public ApproachDto[] Approaches { get; private set; }

        public ImpactDto[] Impacts { get; private set; }

        public LikelihoodDto[] Likelihoods { get; private set; }

        public RifCategoryDto[] RifCategories { get; private set; }

        public AssumptionStatusDto[] AssumptionStatuses { get; private set; }
    }

    public class AssumptionStatusDto
    {
        public int Id { get; private set; }
        public string Description { get; private set; }
        public bool IsFinalState { get; private set; }
    }

    public class ApproachDto
    {
        public int Id { get; private set; }

        public String Description { get; private set; }
    }

    public class ImpactDto
    {

        public int Id { get; private set; }

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