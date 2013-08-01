CREATE PROCEDURE dbo.UpdateAssumption (
    @id int,
    @version TIMESTAMP,
    @description nvarchar(2048),
    @workstream nvarchar(50),
    @owner nvarchar(50),
    @validatedBy nvarchar(50),
    @supportingDocumentation nvarchar(512),
    @assumptionStatusId int
)
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRANSACTION;

    DECLARE @isFinalState bit;

    SELECT @isFinalState = [IsFinalState] 
    FROM dbo.AssumptionStatus sts
    WHERE sts.Id = @assumptionStatusId;

    IF @@ROWCOUNT = 0
        THROW 50001, 'No such AssumptionStatus.', 1 

    if @isFinalState = 1
    begin
        if @validatedBy is null 
            throw 50001, 'ValidatedBy must be set for a final State.', 2
        if @supportingDocumentation is null
            throw 50001, 'SupportingDocumentation must be set for a final State', 3
    end
    else
    begin
        set @validatedBy = null;
    end


    UPDATE  dbo.Assumption
    SET     Description = @description,
            Workstream  = @workstream,
            Owner = @owner,
            ValidatedBy = @validatedBy,
            SupportingDocumentation = @supportingDocumentation,
            AssumptionStatusId = @assumptionStatusId,
            UpdatedBy = CURRENT_USER,
            UpdatedTimestamp = CURRENT_TIMESTAMP
    WHERE
            Id = @id
    AND     Version = @version;

    COMMIT TRANSACTION;

END;