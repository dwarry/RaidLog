CREATE PROCEDURE dbo.usp_UpdateDependency
    @id int,
    @version rowversion,
    @status nvarchar(16),
    @workstream nvarchar(50),
    @description nvarchar(2048),
    @plannedDate date,
    @requiredByDate date,
    @comments nvarchar(2048),
    @ragStatus nvarchar(5),
    @dependencyLevel nvarchar(50)
AS
BEGIN

	SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRANSACTION;
        
    UPDATE [dbo].[Dependency]
       SET     
               [Status]             = @status
              ,[Workstream]         = @workstream
              ,[Description]        = @description
              ,[PlannedDate]        = @plannedDate
              ,[RequiredByDate]     = @requiredByDate
              ,[Comments]           = @comments
              ,[RagStatus]          = @ragStatus
              ,[DependencyLevel]    = @dependencyLevel
     OUTPUT
               INSERTED.*
     WHERE     [Id] = @id
     AND       [Version] = @version;
               

    COMMIT TRANSACTION;

END