-- =============================================
-- Author:		Dave Warry
-- Create date: 2013-05-16
-- Description:	Inserts a new Project
-- =============================================
CREATE PROCEDURE [dbo].[usp_CreateProject] 
    -- Add the parameters for the stored procedure here
    @code nvarchar(16), 
    @name nvarchar(50),
    @userName nvarchar(50)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON;

    INSERT INTO [dbo].[Project]
           ([Code]
           ,[Name]
           ,[NextRiskNumber]
           ,[NextAssumptionNumber]
           ,[NextIssueNumber]
           ,[NextDependencyNumber]
           ,[UpdatedTimestamp]
           ,[UpdatedBy])
     OUTPUT Inserted.*
     VALUES
           (@code
           ,@name
           ,1
           ,1
           ,1
           ,1
           ,CURRENT_TIMESTAMP
           ,@userName);


    RETURN 0;

END
