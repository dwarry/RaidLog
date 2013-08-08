CREATE PROCEDURE [dbo].[usp_UpdateIssue]
    
    @id int,
    @version int,
    @owner nvarchar(50),
    @workstream nvarchar(50),
    @description nvarchar(2048),
    @commentary nvarchar(2048),
    @resolvedDate date,
    @resolvedBy nvarchar(50),
    @resolutionDescription nvarchar(512)
    
    
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    
    UPDATE  [dbo].[Issue]
    SET 
            [Owner]                 = @owner
           ,[Workstream]            = @workstream
           ,[Description]           = @description
           ,[Commentary]            = @commentary
           ,[ResolvedDate]          = @resolvedDate
           ,[ResolvedBy]            = @resolvedBy
           ,[ResolutionDescription] = @resolutionDescription
           ,[UpdatedTimestamp]      = SYSDATETIME()
           ,[UpdatedBy]             = CURRENT_USER
     OUTPUT
            INSERTED.*
     WHERE  [Id] = @id 
     AND    [Version] = @version;
    
END