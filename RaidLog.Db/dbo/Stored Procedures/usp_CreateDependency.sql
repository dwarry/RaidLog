CREATE PROCEDURE dbo.usp_CreateDependency
    @projectId int,
    @status nvarchar(10),
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
    
    DECLARE @dependencyNumbers Table(dependencyNo int);
    DECLARE	@dependencyNumber int;

    UPDATE  dbo.Project
    SET     NextDependencyNumber = NextDependencyNumber + 1
    OUTPUT  deleted.NextDependencyNumber into @dependencyNumbers
    WHERE   Id = @projectId;
    
    if @@ROWCOUNT = 0
        THROW 50001, 'No Project with that id', 1;
    
    select @dependencyNumber = dependencyNo
    from @dependencyNumbers;	

    INSERT INTO [dbo].[Dependency]
               ([ProjectId]
               ,[DependencyNumber]
               ,[Status]
               ,[Workstream]
               ,[Description]
               ,[PlannedDate]
               ,[RequiredByDate]
               ,[Comments]
               ,[RAG]
               ,[DependencyLevel])
     OUTPUT
               INSERTED.*
     VALUES
               (@projectId
               ,@dependencyNumber
               ,@status
               ,@workstream
               ,@description
               ,@plannedDate
               ,@requiredByDate
               ,@comments
               ,@ragStatus
               ,@dependencyLevel);

    COMMIT TRANSACTION;

END