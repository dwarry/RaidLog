-- =============================================
-- Author:		Dave Warry
-- Create date: 2013-05-15
-- Description:	Updates a Risk, maybe adding a new entry to the RiskEvaluation
-- =============================================
CREATE PROCEDURE [dbo].[usp_UpdateRisk] 
	-- Add the parameters for the stored procedure here
	@riskId int, 
    @version timestamp,
	@userName nvarchar(50),
	@description nvarchar(2048),
	@impactCommentary nvarchar(2048),
	@rifCategoryId int,
	@isProjectRisk bit,
	@workstream nvarchar(50),
	@approachId int,
	@impactId int,
	@likelihoodId int,
	@owner nvarchar(50),
    @isActive bit
AS
BEGIN
	declare @evaluationDate datetime2(7)
    
    set @evaluationDate = SYSDATETIME()

	SET NOCOUNT ON;

	update dbo.Risk
	set Description = @description,
	    ImpactCommentary = @impactCommentary,
	    RifCategoryId = @rifCategoryId,
	    IsProjectRisk = @isProjectRisk,
	    Workstream = @workstream,
	    ApproachId = @approachId,
	    UpdatedTimestamp = @evaluationDate,
	    UpdatedBy = @userName
	where
		Id = @riskId
	and [Version] = @version;
	
	if @@ROWCOUNT = 0
		return 1;
		
	merge into dbo.RiskEvaluation as re
	using (values (@riskId, @evaluationDate, @impactId, @likelihoodId, @owner, @isActive))
	   as NewValues(RiskId, EvaluationDate, ImpactId, LikelihoodId, [Owner], IsActive)
	   on (re.RiskId = NewValues.RiskId and re.EvaluationDate = NewValues.EvaluationDate)
	when matched then
		update set [ImpactId] = [NewValues].[ImpactId], 
		           [LikelihoodId] = [NewValues].[LikelihoodId], 
		           [Owner] = [NewValues].[Owner],
                   [IsActive] = [NewValues].[IsActive]
	when not matched then
		insert ([RiskId], [EvaluationDate], [ImpactId], [LikelihoodId], [Owner], [IsActive])
		values([NewValues].[RiskId], [NewValues].[EvaluationDate], [NewValues].[ImpactId], [NewValues].[LikelihoodId], [NewValues].[Owner], 1);

	return 0;
END;
