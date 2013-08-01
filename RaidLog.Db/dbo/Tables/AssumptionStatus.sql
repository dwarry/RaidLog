CREATE TABLE [dbo].[AssumptionStatus] (
    [Id]           INT           NOT NULL,
    [Description]  NVARCHAR (50) NOT NULL,
    [IsFinalState] BIT           CONSTRAINT [DF_AssumptionStatus_IsFinalState] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_AssumptionStatus] PRIMARY KEY CLUSTERED ([Id] ASC)
);

 

GO
