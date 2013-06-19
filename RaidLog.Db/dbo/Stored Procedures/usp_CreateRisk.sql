-- =============================================
-- Author:		Dave Warry
-- Create date: 2013-05-16
-- Description:	Inserts a new Risk
-- =============================================
CREATE PROCEDURE [dbo].[usp_CreateRisk] 
    -- Add the parameters for the stored procedure here
    @projectId int,
    @description nvarchar(2048),
    @userName nvarchar(50),
    @rifCategoryId int,
    @isProjectRisk bit,
    @workstream nvarchar(50),
    @impactCommentary nvarchar(2048),
    @approachId int,
    @impactId int,
    @likelihoodId int,
    @owner nvarchar(50),
    @riskId int out
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @riskNumbers Table(riskNo int);
    DECLARE	@riskNumber int;

    UPDATE dbo.Project
    set NextRiskNumber = NextRiskNumber + 1
    output deleted.NextRiskNumber into @riskNumbers
    where Id = @projectId;
    
    if @@ROWCOUNT = 0
        RETURN 1;
    
    select @riskNumber = riskNo
    from @riskNumbers;	

    INSERT INTO [dbo].[Risk]
           ([ProjectId]
           ,[RiskNumber]
           ,[Description]
           ,[RaisedDate]
           ,[RaisedBy]
           ,[RifCategoryId]
           ,[IsProjectRisk]
           ,[Workstream]
           ,[ImpactCommentary]
           ,[ApproachId]
           ,[UpdatedTimestamp]
           ,[UpdatedBy])
     OUTPUT
            INSERTED.*
     VALUES
           (@projectId
           ,@riskNumber
           ,@description
           ,CURRENT_TIMESTAMP
           ,@userName
           ,@rifCategoryId
           ,@isProjectRisk
           ,@workstream
           ,@impactCommentary
           ,@approachId
           ,CURRENT_TIMESTAMP
           ,@userName);
    
    set @riskId = SCOPE_IDENTITY();       
    
    if @impactId is not null OR @likelihoodId is not null or @owner is not null
    begin
        INSERT INTO [dbo].[RiskEvaluation]
           ([RiskId]
           ,[EvaluationDate]
           ,[ImpactId]
           ,[LikelihoodId]
           ,[Owner])
        VALUES
           (@riskId
           ,CURRENT_TIMESTAMP
           ,@impactId
           ,@likelihoodId
           ,@owner);
    end;

    RETURN 0;
END
