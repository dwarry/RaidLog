CREATE PROCEDURE [dbo].[usp_UpdateAction] 
	@id int, 
    @version timestamp,
    @description nvarchar(256),
    @actor nvarchar(50),
    @actionStatusId int,
    @dueDate date,
    @resolvedDate date,
    @resolution nvarchar(256)
AS
BEGIN

	SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRANSACTION

    UPDATE [dbo].[Action]
       SET [Description] = @description
         , [Actor] = @actor
         , [ActionStatusId] = @actionStatusId
         , [DueDate] = @dueDate
         , [ResolvedDate]= @resolvedDate
         , [Resolution] = @resolution
    OUTPUT
           INSERTED.*
     WHERE
           Id = @id
       AND Version = @version;

    COMMIT TRANSACTION;

end;