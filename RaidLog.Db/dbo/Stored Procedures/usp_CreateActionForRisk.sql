-- =============================================
-- Author:		Dave Warry
-- Create date: 2013-05-15
-- Description:	Add an action to a risk
-- =============================================
CREATE PROCEDURE usp_CreateActionForRisk 
	-- Add the parameters for the stored procedure here
	@riskId int, 
	@description nvarchar(256),
	@actor nvarchar(50),
	@updatedBy nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @actionId int;

	INSERT INTO [dbo].[Action]
           ([Description]
           ,[Actor]
           ,[IsComplete]
           ,[Resolution]
           ,[Version]
           ,[UpdatedBy]
           ,[UpdatedTimestamp])
     VALUES
           (@description
           ,@actor
           ,0
           ,null
           ,1
           ,@updatedBy
           ,SYSDATETIME());

	set @actionId = SCOPE_IDENTITY();
	
	INSERT INTO [dbo].[Risk_Action]
           ([RiskId]
           ,[ActionId])
     VALUES
           (@riskId
           ,@actionId);
           
    return 0;




END
