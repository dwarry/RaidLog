create PROCEDURE [dbo].[usp_CreateQuery]
    @projectId int,
    @workstream nvarchar(50),
    @deliverableImpacted nvarchar(50),
    @urgency nvarchar(10),
    @description nvarchar(1024),
    @raisedBy nvarchar(50),
    @raisedTo nvarchar(50),
    @raisedDate date
AS
BEGIN

	SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRANSACTION;
    
    DECLARE @queryNumbers Table(queryNo int);
    DECLARE	@queryNumber int;

    UPDATE  dbo.Project
    SET     NextQueryNumber = NextQueryNumber + 1
    OUTPUT  deleted.NextQueryNumber into @queryNumbers
    WHERE   Id = @projectId;
    
    if @@ROWCOUNT = 0
        THROW 50001, 'No Project with that id', 1;
    
    select @queryNumber = queryNo
    from @queryNumbers;	


INSERT INTO [dbo].[Query]
           ([ProjectId]
           ,[QueryNumber]
           ,[Workstream]
           ,[DeliverableImpacted]
           ,[Urgency]
           ,[Description]
           ,[RaisedBy]
           ,[RaisedTo]
           ,[RaisedDate]
           ,[UpdatedBy]
           ,[UpdatedTimestamp])
     OUTPUT
            inserted.*
     VALUES
           (@projectId
           ,@queryNumber
           ,@workstream
           ,@deliverableImpacted
           ,@urgency
           ,@description
           ,@raisedBy
           ,@raisedTo
           ,@raisedDate
           ,CURRENT_USER
           ,SYSDATETIME()
           )

    COMMIT TRANSACTION;

END