create PROCEDURE [dbo].[usp_UpdateQuery]
    @id int,
    @version rowversion,
    @workstream nvarchar(50),
    @deliverableImpacted nvarchar(50),
    @urgency nvarchar(10),
    @description nvarchar(1024),
    @raisedTo nvarchar(50),
    @answer nvarchar(1024),
    @answeredBy nvarchar(50),
    @answeredDate date,
    @confirmedInDocuments nvarchar(256)
AS
BEGIN

	SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRANSACTION;
    
    UPDATE [dbo].[Query]
    SET
            [Workstream] = @workstream
           ,[DeliverableImpacted] = @deliverableImpacted
           ,[Urgency] = @urgency
           ,[Description] = @description
           ,[RaisedTo] = @raisedTo
           ,[Answer] =@answer
           ,[AnsweredBy] = @answeredBy
           ,[AnsweredDate] = @answeredDate
           ,[UpdatedBy]  = CURRENT_USER
           ,[UpdatedTimestamp] = SYSDATETIME()
     OUTPUT
            inserted.*
     WHERE
            Id = @id
     AND    Version = @version;

    COMMIT TRANSACTION;

END