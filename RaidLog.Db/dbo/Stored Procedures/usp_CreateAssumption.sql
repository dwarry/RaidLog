CREATE PROCEDURE [dbo].[usp_CreateAssumption] 
	@projectId int, 
    @description nvarchar(2048),
    @workstream nvarchar(50),
    @owner nvarchar(50),
    @validatedBy nvarchar(50),
    @status nvarchar(50),
    @followOnAction nvarchar(1024),
    @supportingDocumentation nvarchar(512),
    @assumptionId int out
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    DECLARE @assumptionNumber int;
    DECLARE @assumptionNumbers Table(assumptionNo int);
    
    UPDATE dbo.Project
    set NextAssumptionNumber = NextAssumptionNumber + 1
    output deleted.NextAssumptionNumber into @assumptionNumbers
    where Id = @projectId;
    
    if @@ROWCOUNT = 0
        RETURN 1;
    
    select @assumptionNumber = assumptionNo
    from @assumptionNumbers;	

    INSERT INTO [dbo].[Assumption]
           ([ProjectId]
           ,[AssumptionNumber]
           ,[Description]
           ,[Workstream]
           ,[Owner]
           ,[ValidatedBy]
           ,[Status]
           ,[FollowOnAction]
           ,[SupportingDocumentation])
     OUTPUT 
           Inserted.*
     VALUES
           (@projectId
           ,@assumptionNumber
           ,@description
           ,@workstream
           ,@owner
           ,@validatedBy
           ,@status
           ,@followOnAction
           ,@supportingDocumentation)

     set @assumptionId = SCOPE_IDENTITY();

    RETURN 0

END