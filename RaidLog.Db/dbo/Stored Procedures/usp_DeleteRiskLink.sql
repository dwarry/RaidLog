-- =============================================
-- Author:		Dave Warry
-- Create date: 2013-05-15
-- Description:	Deletes a link between two Risks
-- =============================================
CREATE PROCEDURE [usp_DeleteRiskLink] 
	-- Add the parameters for the stored procedure here
	@parentRiskId int = 0, 
	@childRiskId int = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	delete from dbo.RiskLinks
	where ParentRiskId = @parentRiskId and ChildRiskId = @childRiskId;
	
	-- don't care much if it didn't do anything...
	RETURN 0;
END