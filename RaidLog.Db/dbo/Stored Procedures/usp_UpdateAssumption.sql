CREATE PROCEDURE [dbo].[usp_UpdateAssumption]
	@id int,
    @version timestamp,
	@description nvarchar(2048),
    @workstream nvarchar(50),
    @owner nvarchar(50),
    @validatedBy nvarchar(50),
    @statusId int,
    @supportingDocumentation nvarchar(512)
AS
	SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @isFinalState bit;

    begin transaction

    begin try
        SELECT @isFinalState = [IsFinalState] 
        FROM dbo.AssumptionStatus sts
        WHERE sts.Id = @statusId;

        IF @isFinalState = 1
        BEGIN
            IF @validatedBy IS NULL 
                THROW 50001, 'ValidatedBy must be set for a final State.', 2;
            IF @supportingDocumentation is null
                THROW 50001, 'SupportingDocumentation must be set for a final State', 3;
        ELSE
            IF @validatedBy IS NOT NULL
                THROW 50001, 'ValidationBy cannot be set for a non-final state', 4;
        END

        UPDATE dbo.Assumption
        SET
                Description = @description,
                Workstream = @workstream,
                Owner = @owner,
                ValidatedBy = @validatedBy,
                AssumptionStatusId = @statusId,
                SupportingDocumentation = @supportingDocumentation,
                UpdatedBy = CURRENT_USER,
                UpdatedTimestamp = SYSDATETIME()
        OUTPUT
                inserted.*
        WHERE
                [id] = @id
        AND     [Version] = @version;

        commit transaction
    end try
    begin catch
        rollback transaction
        return 1
    end catch
RETURN 0
