CREATE PROCEDURE [dbo].[usp_CreateAssumption] 
	@projectId int, 
    @description nvarchar(2048),
    @workstream nvarchar(50),
    @owner nvarchar(50),
    @validatedBy nvarchar(50),
    @statusId int,
    @supportingDocumentation nvarchar(512),
    @assumptionId int out
AS
BEGIN

	SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @assumptionNumber int;
    DECLARE @assumptionNumbers Table(assumptionNo int);
    DECLARE @isFinalState bit;

    BEGIN TRANSACTION

    SELECT @isFinalState = [IsFinalState] 
    FROM dbo.AssumptionStatus sts
    WHERE sts.Id = @statusId;

    IF @@ROWCOUNT = 0
        THROW 50001, 'No such AssumptionStatus.', 1 

    IF @isFinalState = 1
    BEGIN
        IF @validatedBy IS NULL 
            THROW 50001, 'ValidatedBy must be set for a final State.', 2
        IF @supportingDocumentation is null
            THROW 50001, 'SupportingDocumentation must be set for a final State', 3
    END
    ELSE
    BEGIN
        SET @validatedBy = NULL;
    END


    UPDATE dbo.Project
    SET NextAssumptionNumber = NextAssumptionNumber + 1
    OUTPUT deleted.NextAssumptionNumber INTO @assumptionNumbers
    WHERE Id = @projectId;
    

    IF @@ROWCOUNT = 0
        RETURN 1;
    
    SELECT @assumptionNumber = assumptionNo
    FROM @assumptionNumbers;	

    INSERT INTO [dbo].[Assumption]
           ([ProjectId]
           ,[AssumptionNumber]
           ,[Description]
           ,[Workstream]
           ,[Owner]
           ,[ValidatedBy]
           ,[AssumptionStatusId]
           ,[SupportingDocumentation]
           ,[UpdatedBy]
           ,[UpdatedTimestamp])
     OUTPUT 
           Inserted.*
     VALUES
           (@projectId
           ,@assumptionNumber
           ,@description
           ,@workstream
           ,@owner
           ,@validatedBy
           ,@statusId
           ,@supportingDocumentation
           ,CURRENT_USER
           ,SYSDATETIME())

    SET @assumptionId = SCOPE_IDENTITY();

    COMMIT TRANSACTION;

    RETURN 0

END
