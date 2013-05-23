CREATE TABLE [dbo].[Action] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [Description]      NVARCHAR (256) NOT NULL,
    [Actor]            NVARCHAR (50)  NOT NULL,
    [IsComplete]       BIT            NOT NULL,
    [Resolution]       NVARCHAR (256) NOT NULL,
    [VersionNumber]    INT            NOT NULL,
    [UpdatedBy]        NVARCHAR (50)  NOT NULL,
    [UpdatedTimestamp] DATETIME2 (7)  NOT NULL,
    CONSTRAINT [PK_Action] PRIMARY KEY CLUSTERED ([Id] ASC)
);

