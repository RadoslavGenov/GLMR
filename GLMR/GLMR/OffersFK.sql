ALTER TABLE [dbo].[Offers]
	ADD CONSTRAINT [OffersFK]
	FOREIGN KEY (CityId)
	REFERENCES [Cities] (Id)
