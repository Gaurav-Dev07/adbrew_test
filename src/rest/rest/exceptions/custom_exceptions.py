class ItemAlreadyExists(Exception):
    def __init__(self, message="Item already exists"):
        self.message = message
        super().__init__(self.message)