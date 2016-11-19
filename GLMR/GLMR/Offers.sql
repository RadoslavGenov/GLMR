CREATE TABLE [dbo].[Offers]
(
	[CityId] INT NOT NULL IDENTITY PRIMARY KEY,
	[CityName] VARCHAR(100) NOT NULL, 
	[StateName] VARCHAR(15) NOT NULL,
	[Position] VARCHAR(30) NOT NULL,
	[Wage] INT NOT NULL,
	[WorkingHours] INT NOT NULL,
	[Overtime] BIT NOT NULL, 
    [StartDate] VARCHAR(20) NOT NULL, 
    [EndDate] VARCHAR(20) NOT NULL, 
    [Link] VARCHAR(1000) NOT NULL,
)


