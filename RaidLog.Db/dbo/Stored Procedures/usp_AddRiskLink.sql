-- =============================================
-- Author:		Dave Warry
-- Create date: 2013-05-15
-- Description:	Adds a link between risks
-- =============================================
CREATE PROCEDURE usp_AddRiskLink 
	-- Add the parameters for the stored procedure here
	@parentRiskId int, 
	@childRiskId int
AS
BEGIN
	
	declare @parentProjectId int, @childProjectId int;
	
	declare @exists bit;
	
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if @parentRiskId is null or @childRiskId is null
		return 1; -- unacceptable parameter values
	
	select @parentProjectId = ProjectId from dbo.Risk where Id = @parentRiskId;
	
	select @childProjectId = ProjectId from dbo.Risk where Id = @childRiskId;
	
	if @parentProjectId <> @childProjectId
		return 2; -- different projects
		
	select @exists = 1 from dbo.RiskLinks
	where ParentRiskId = @childRiskId
	  and ChildRiskId = @parentRiskId;
	
	if @exists = 1
		return 3; -- can create a circular link
		
	select @exists = 1 from dbo.RiskLinks
	where ParentRiskId = @parentRiskId
	  and ChildRiskId = @childRiskId;
	  
	if @exists = 1
		return 0; -- already exists, but that's ok
		
	insert into dbo.RiskLinks (ParentRiskId, ChildRiskId) values (@parentRiskId, @childRiskId);
	
	return 0;
	
	
END
