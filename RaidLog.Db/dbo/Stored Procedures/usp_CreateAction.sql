CREATE PROCEDURE [dbo].[usp_CreateAction] 
	@parentItemId int, 
    @parentItemType nvarchar(50),
    @description nvarchar(256),
    @actor nvarchar(50),
    @actionStatusId int,
    @dueDate date
AS
BEGIN

	SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @actionNumber int;
    DECLARE @actionNumbers Table(actionNo int);
    DECLARE @isFinalState bit;
    DECLARE @actionId     int;
    DECLARE @projectId    int;

    SELECT @isFinalState = [IsFinalState] 
    FROM dbo.ActionStatus sts
    WHERE sts.Id = @actionStatusId;
    
    IF @@ROWCOUNT = 0
        THROW 50001, 'No such ActionStatus.', 1;

    IF @isFinalState = 1
        throw 50001, 'Cannot create an Action in a final state', 0;


    if @parentItemType = 'Risk'
        SELECT @projectId = ProjectId
          from [dbo].[Risk]
        WHERE [Id] = @parentItemId;
    else if @parentItemType = 'Assumption'
        SELECT @projectId = ProjectId
          from [dbo].[Assumption]
        WHERE [Id] = @parentItemId;
    else if @parentItemType = 'Issue'
        SELECT @projectId = ProjectId
          from [dbo].[Issue]
        WHERE [Id] = @parentItemId;
    else if @parentItemType = 'Dependency'
        SELECT @projectId = ProjectId
          from [dbo].[Dependency]
        WHERE [Id] = @parentItemId;
    else if @parentItemType = 'Query'
        SELECT @projectId = Id
          from [dbo].[Query]
         WHERE [Id] = @parentItemId;
    else
        throw 50001, 'Unknown Parent Item Type', 2

    if @projectId is null
        throw 50001, 'No such Parent Item:', 3 


    UPDATE dbo.Project
    SET NextActionNumber = NextActionNumber + 1
    OUTPUT deleted.NextActionNumber INTO @actionNumbers
    WHERE Id = @projectId;
    

    IF @@ROWCOUNT = 0
        throw 50001, 'Could not get Action Number', 4;
    
    SELECT @actionNumber = actionNo
    FROM @actionNumbers;	

    INSERT INTO [dbo].[Action]
               ([ActionNumber]
               ,[Description]
               ,[Actor]
               ,[ActionStatusId]
               ,[DueDate]
               ,[UpdatedBy]
               ,[UpdatedTimestamp])
         OUTPUT
                INSERTED.*
         VALUES
               (@actionNumber
               ,@description
               ,@actor
               ,@actionStatusId
               ,@dueDate
               ,CURRENT_USER
               ,SYSDATETIME());

    set @actionId = SCOPE_IDENTITY();

    if @parentItemType = 'Risk'
        INSERT INTO [dbo].[Risk_Action]
                   ([RiskId]
                   ,[ActionId])
             VALUES
                   (@parentItemId
                   ,@actionId)

    else if @parentItemType = 'Assumption'
        INSERT INTO [dbo].[Assumption_Action]
                   ([AssumptionId]
                   ,[ActionId])
             VALUES
                   (@parentItemId
                   ,@actionId)
    else if @parentItemType = 'Issue'
            INSERT INTO [dbo].[Issue_Action]
                   ([IssueId]
                   ,[ActionId])
             VALUES
                   (@parentItemId
                   ,@actionId)
    else if @parentItemType = 'Dependency'
            INSERT INTO [dbo].[Dependency_Action]
                   ([DependencyId]
                   ,[ActionId])
             VALUES
                   (@parentItemId
                   ,@actionId)
    else if @parentItemType = 'Query'
            INSERT INTO [dbo].[Query_Action]
                   ([QueryId]
                   ,[ActionId])
             VALUES
                   (@parentItemId
                   ,@actionId)
    else
        throw 50001, 'Unknown Parent Item Type', 5
    
    
end;